import { Select, SelectItem, SelectPopup, SelectTrigger } from '@/components/Select'
import { TextBlock } from '@/components/TextBlock'
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
      <TextBlock variant="caption-1-mono" className="text-text-secondary">
        THEME
      </TextBlock>
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
