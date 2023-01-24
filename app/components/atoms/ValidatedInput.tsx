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
} & Pick<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'disabled'>

function ValidatedInput({
  name,
  value: defaultValue,
  label,
  placeholder,
  className,
  type,
  onChange,
  submitOnChange,
  ...props
}: ValidatedInput) {
  const { error, getInputProps } = useField(name)
  const { submit, fieldErrors, isValid } = useFormContext()
  const [value, setValue] = useControlField<string | undefined>(name)
  const isCheckboxOrRadio = type === 'checkbox' || type === 'radio'
  const isTextLike = type !== 'button' && !isCheckboxOrRadio

  if (type === 'hidden') {
    return (
      <input
        {...props}
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
          className={cn('w-full', 'rounded-md', 'text-black', className)}
          placeholder={placeholder}
          type={type}
          {...props}
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
          <div
            className={cn('px-3 pt-3 pb-2 -mt-1', 'bg-error text-sm rounded-b')}
          >
            {error}
          </div>
        )}
      </div>
    )
  }

  if (isCheckboxOrRadio) {
    return (
      <input
        className={cn(className, error && 'border-raspberry')}
        type={type}
        {...props}
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