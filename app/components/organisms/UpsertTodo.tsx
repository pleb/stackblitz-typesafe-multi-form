import { useEffect } from 'react'
import { ValidatedForm, Validator } from 'remix-validated-form'
import {
  ValidatedHiddenInput,
  ValidatedTextInput,
} from '~/components/atoms/ValidatedInput'
import { useFocus } from '~/hooks/useFocus'
import { Button } from '~/components/atoms/Button'

export const UpsertTodo = <
  T extends {
    description: string
    id: number | string
  },
  TValidator extends Validator<unknown>,
>({
  todo,
  dispatchActions,
  validator,
  onSubmit,
  disabled,
}: {
  todo?: T
  dispatchActions: {
    upsert: string
  }
  validator: TValidator
  onSubmit: () => void
  disabled?: boolean
}) => {
  const [inputRef, setInputFocus] = useFocus<HTMLInputElement>()
  useEffect(() => {
    setInputFocus()
  }, [todo])
  return (
    <ValidatedForm
      validator={validator}
      onSubmit={() => onSubmit?.()}
      resetAfterSubmit={true}
      method='post'
    >
      <ValidatedHiddenInput name='id' value={todo?.id.toString()} />
      <div className='mt-2 py-3 px-4 grid grid-flow-col auto-cols-[1fr_200px] gap-2 items-start'>
        <ValidatedTextInput
          ref={inputRef}
          className='p-2 border'
          label='To-do description'
          placeholder='Todo description'
          name='description'
          value={todo?.description}
          disabled={disabled}
        />
        <Button
          className='text-black'
          type='submit'
          name='_action'
          value={dispatchActions.upsert}
          disabled={disabled}
        >
          {todo ? 'Edit' : 'Add'}
        </Button>
      </div>
    </ValidatedForm>
  )
}
