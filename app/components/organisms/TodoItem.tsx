import { ValidatedForm, Validator } from 'remix-validated-form'
import { Panel } from '~/components/atoms/Panel'
import {
  ValidatedCheckboxInput,
  ValidatedHiddenInput,
} from '~/components/atoms/ValidatedInput'
import { IconButton } from '../molecules/IconButton'
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
            <IconButton
              color='Red'
              type='submit'
              name='_action'
              value={dispatchActions.delete}
            >
              <Delete />
            </IconButton>
            <IconButton color='Green' onClick={() => onEdit(todo)}>
              <Edit />
            </IconButton>
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
