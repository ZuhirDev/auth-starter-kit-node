import React, { useState } from "react"
import { Check, ChevronsUpDown, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

const MultiSelect = ({
  items,
  value,
  onValueChange,
  displayField,
  placeholder = "Select items...",
  searchPlaceholder = "Search...",
  emptyText = "No items found.",
  className,
}) => {
  const [open, setOpen] = useState(false)

  const handleSelect = (item) => {
    const isSelected = value.some((selected) => selected.id === item.id)

    if (isSelected) {
      onValueChange(value.filter((selected) => selected.id !== item.id))
    } else {
      onValueChange([...value, item])
    }
  }

  return (
    <div className={cn("space-y-2", className)}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" role="combobox" className="w-full justify-between">
            {value.length === 0 ? placeholder : `${value.length} selected`}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0">
          <Command>
            <CommandInput placeholder={searchPlaceholder} />
            <CommandList>
              <CommandEmpty>{emptyText}</CommandEmpty>
              <CommandGroup>
                {items.map((item) => (
                  <CommandItem key={item.id} onSelect={() => handleSelect(item)} className="cursor-pointer">
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        value.some((selected) => selected.id === item.id) ? "opacity-100" : "opacity-0",
                      )}
                    />
                    {String(item[displayField])}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      {value.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {value.map((item) => (
            <Badge key={item.id} variant="secondary" className="flex items-center gap-1">
              {String(item[displayField])}
            </Badge>
          ))}
        </div>
      )}
    </div>
  )
}

export default MultiSelect
