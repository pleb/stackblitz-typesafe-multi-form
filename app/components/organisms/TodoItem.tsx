import { ValidatedForm, Validator } from 'remix-validated-form'
import { Panel } from '~/components/atoms/Panel'
import {
  ValidatedCheckboxInput,
  ValidatedHiddenInput,
} from '~/components/atoms/ValidatedInput'
import { GlassButton } from '../molecules/GlassButton'
import Delete from 'icon/Delete'
import Edit from 'icon/Edit'
import { cn } from '~/utilities/cn'

export const TodoItem = <
  T extends {
    description: string
    id: number | string
  },
  TValidator extends Validator<unknown>,
>({
  todo,
  onEdit,
  disableActions,
  dispatchActions,
  validator,
}: {
  todo: T
  onEdit: (todo: T) => void
  disableActions: boolean
  dispatchActions: {
    delete: string
    complete: string
  }
  validator: TValidator
}) => {
  return (
    <ValidatedForm validator={validator} method='post' resetAfterSubmit={true}>
      <ValidatedHiddenInput name='id' value={todo.id.toString()} />
      <Panel border='b' className={cn('py-3', 'grid grid-flow-col')}>
        <div>{todo.description}</div>
        {!disableActions && (
          <div className='w-30 justify-self-end grid gap-2 grid-flow-col content-center'>
            <GlassButton
              backgroundClass='[&]:bg-red-700 [&]:hover:bg-red-500 [&]:active:bg-red-300'
              className='py-1 px-2 '
              type='submit'
              name='_action'
              value={dispatchActions.delete}
            >
              <Delete />
            </GlassButton>
            <GlassButton
              backgroundClass='[&]:bg-green-700 [&]:hover:bg-green-500 [&]:active:bg-green-300'
              className='py-1 px-2 '
              onClick={() => onEdit(todo)}
            >
              <Edit />
            </GlassButton>
            <ValidatedCheckboxInput
              className='ml-2'
              name='_action'
              label='Complete todo'
              value={dispatchActions.complete}
              submitOnChange={true}
            />
          </div>
        )}
      </Panel>
    </ValidatedForm>
  )
}
