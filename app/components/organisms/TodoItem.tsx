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
  disabled,
}: {
  todo: T
  onEdit: (todo: T) => void
  disableActions: boolean
  dispatchActions: {
    delete: string
    complete: string
  }
  validator: TValidator
  disabled?: boolean
}) => {
  return (
    <ValidatedForm
      validator={validator}
      name={`todo-row-${todo.id}`}
      method='post'
      resetAfterSubmit={true}
    >
      <ValidatedHiddenInput name='id' value={todo.id.toString()} />
      <Panel
        border='b'
        className={cn('p-3', 'hover:bg-glass/20', 'grid grid-flow-col')}
      >
        <div aria-label={`To-do entry ${todo.description}`}>{todo.description}</div>
        {!disableActions && (
          <div className='w-30 justify-self-end grid gap-2 grid-flow-col content-center'>
            <IconButton
              color='Red'
              type='submit'
              name='_action'
              value={dispatchActions.delete}
              disabled={disabled}
              aria-label='Delete to-do entry'
            >
              <Delete aria-hidden={true} />
            </IconButton>
            <IconButton
              color='Green'
              onClick={() => onEdit(todo)}
              disabled={disabled}
              aria-description='Edit to-do entry'
            >
              <Edit aria-hidden={true} />
            </IconButton>
            <ValidatedCheckboxInput
              className='ml-2'
              name='_action'
              label='Complete to-do entry'
              value={dispatchActions.complete}
              submitOnChange={true}
              disabled={disabled}
            />
          </div>
        )}
      </Panel>
    </ValidatedForm>
  )
}
