import type { Meta, StoryObj } from "@storybook/react"
import { action } from "@storybook/addon-actions"
import { EditableSpan } from "./EditableSpan"

const meta: Meta<typeof EditableSpan> = {
  title: "TODOLISTS/EditableSpan",
  component: EditableSpan,
  tags: ["autodocs"],
  argTypes: {
    title: {
      description: "Start value empty. Add value push button set string.",
    },
    onChange: {
      description: "Value EditableSpan changed",
    },
  },
}

export default meta
type Story = StoryObj<typeof EditableSpan>

export const EditableSpanStory: Story = {
  args: {
    onChange: action("Title EditableSpan changed"),
  },
}
