import { Select, SelectItem, SelectPopup, SelectTrigger } from '@/components/Select'
import { Text } from '@/components/Text'
import { themes } from '@/theme/themes'
import type { Theme } from '@/theme/tokens'

export function ThemeSelect({
  value,
  onChange,
}: {
  value: Theme
  onChange: (theme: Theme) => void
}) {
  return (
    <div>
      <Text as="span" variant="caption-1-mono" className="block text-text-secondary">
        THEME
      </Text>
      <Select
        value={value.id}
        onValueChange={(id) => {
          const next = themes.find((theme) => theme.id === id)
          if (next) onChange(next)
        }}
        items={themes.map(({ id, label }) => ({ value: id, label }))}
      >
        <SelectTrigger aria-label="Theme" className="mt-2" />
        <SelectPopup>
          {themes.map(({ id, label }) => (
            <SelectItem key={id} value={id}>
              {label}
            </SelectItem>
          ))}
        </SelectPopup>
      </Select>
    </div>
  )
}
