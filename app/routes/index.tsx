import { DataFunctionArgs } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { db } from '~/utilities/database'
import { z } from 'zod'
import { zfd } from 'zod-form-data'
import { withZod } from '@remix-validated-form/with-zod'
import { dispatch, DispatchActionsLookup } from '~/utilities/dispatcher'
import { ValidatedForm } from 'remix-validated-form'
import { useCallback, useState } from 'react'
import { delay, randomNumberBetween } from '~/utilities/delay'
import { GlassButton } from '~/components/molecules/GlassButton'
import { Title } from '~/components/atoms/Title'
import { GlassPanel } from '~/components/molecules/GlassPanel'
import { TodoItem } from '~/components/organisms/TodoItem'
import { Panel } from '~/components/atoms/Panel'
import { UpsertTodo } from '~/components/organisms/UpsertTodo'
import { useLoadingContext } from '~/contexts/loadingContext'
import Loading from 'icon/LoadingIndicator'

const validator = withZod(
  z.discriminatedUnion('_action', [
    z.object({
      _action: z.literal('reset'),
    }),
    zfd
      .formData({
        _action: z.literal('upsert'),
        description: zfd.text(z.string().min(2).max(50)),
        id: zfd.numeric(z.number().optional()),
      })
      .innerType(),
    zfd
      .formData({
        _action: z.literal('delete'),
        id: zfd.numeric(),
      })
      .innerType(),
    zfd
      .formData({
        _action: z.literal('complete'),
        id: zfd.numeric(),
      })
      .innerType(),
  ]),
)

const dispatchActions: DispatchActionsLookup<typeof validator> = {
  reset: 'reset',
  upsert: 'upsert',
  delete: 'delete',
  complete: 'complete',
}

export const loader = async ({ request }: DataFunctionArgs) => {
  return db.load().filter(i => !i.completed && !i.deleted)
}

export const action = async (data: DataFunctionArgs) => {
  // Simulate network latency
  await delay(randomNumberBetween(250, 2000))

  return await dispatch(data, validator, {
    reset: async _ => {
      db.populateSample()
    },
    delete: async result => {
      db.patch(result.id, { deleted: true })
    },
    complete: async result => {
      db.patch(result.id, { completed: true })
    },
    upsert: async result => {
      if (result.id) {
        db.patch(result.id, { description: result.description })
      } else {
        db.append({ description: result.description })
      }
    },
  })
}

type Todo = Awaited<ReturnType<typeof loader>>[number]

export default function Index() {
  const todos = useLoaderData<typeof loader>()
  const [edit, setEdit] = useState<Todo>()
  const clearEdit = useCallback(() => setEdit(undefined), [setEdit])
  const loadingContext = useLoadingContext()

  return (
    <div>
      <ValidatedForm validator={validator} method='post' className='grid mb-2'>
        <GlassButton
          type='submit'
          name='_action'
          value={dispatchActions.reset}
          className='place-self-end py-1 px-4'
          onClick={clearEdit}
          disabled={loadingContext.isLoading}
        >
          Reset
        </GlassButton>
      </ValidatedForm>
      <GlassPanel className='relative'>
        <Title>Simple Todo</Title>
        <Loading
          class='absolute right-2 top-5 animate-spin h-5 w-5 mr-3'
          hidden={!loadingContext.isLoading}
        />
        <Panel className='mt-2 px-4'>
          {todos.map((td, i) => (
            <TodoItem
              key={i}
              todo={td}
              onEdit={setEdit}
              validator={validator}
              disableActions={Boolean(edit)}
              dispatchActions={dispatchActions}
              disabled={loadingContext.isLoading}
            />
          ))}
        </Panel>
        <UpsertTodo
          todo={edit}
          validator={validator}
          dispatchActions={dispatchActions}
          onSubmit={() => {
            setTimeout(clearEdit)
          }}
          disabled={loadingContext.isLoading}
        />
      </GlassPanel>
    </div>
  )
}
