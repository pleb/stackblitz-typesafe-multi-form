import { useControlField, useField, useFormContext } from 'remix-validated-form'
import { cn } from '~/utilities/cn'

export const ValidatedHiddenInput = (
  props: Omit<ValidatedInput, 'type' | 'label' | 'placeholder'>,
) =>
  ValidatedInput({
    ...props,
    label: '',
    type: 'hidden',
  })

export const ValidatedTextInput = (props: Omit<ValidatedInput, 'type'>) =>
  ValidatedInput({
    ...props,
    type: 'text',
  })

export const ValidatedCheckboxInput = (props: Omit<ValidatedInput, 'type'>) =>
  ValidatedInput({
    ...props,
    type: 'checkbox',
  })

type ValidatedInput = {
  name: string
  label: string
  value?: string
  placeholder?: string
  className?: string
  type: React.HTMLInputTypeAttribute
  submitOnChange?: boolean
} & Pick<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'>

function ValidatedInput({
  name,
  value: defaultValue,
  label,
  placeholder,
  className,
  type,
  onChange,
  submitOnChange,
}: ValidatedInput) {
  const { error, getInputProps } = useField(name)
  const { submit, fieldErrors, isValid } = useFormContext()
  const [value, setValue] = useControlField<string | undefined>(name)
  const isCheckboxOrRadio = type === 'checkbox' || type === 'radio'
  const isTextLike = type !== 'button' && !isCheckboxOrRadio

  if (type === 'hidden') {
    return (
      <input
        {...getInputProps({
          type: 'hidden',
          value: value ?? defaultValue ?? '',
          onChange: e => {
            setValue(e.target.value)
            onChange?.(e)
            submitOnChange && submit()
          },
        })}
      />
    )
  }

  if (isTextLike) {
    return (
      <div>
        <input
          className={cn(
            'w-full',
            'text-black',
            className,
            //error && 'border-b-error border-b-2',
          )}
          placeholder={placeholder}
          type={type}
          {...getInputProps({
            type,
            value: value ?? defaultValue ?? '',
            onChange: e => {
              setValue(e.target.value)
              onChange?.(e)
              submitOnChange && submit()
            },
          })}
          aria-label={label}
        />
        {error && (
          <div className={'p-1 bg-error text-sm rounded-b'}>{error}</div>
        )}
      </div>
    )
  }

  if (isCheckboxOrRadio) {
    return (
      <input
        className={cn(className, error && 'border-raspberry')}
        type={type}
        {...getInputProps({
          type,
          value: value ?? defaultValue ?? 'on',
          onChange: e => {
            setValue(e.target.value)
            onChange?.(e)
            submitOnChange && submit()
          },
        })}
        aria-label={label}
      />
    )
  }

  return <>Unsupported input type</>
}
