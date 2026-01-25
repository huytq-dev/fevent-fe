"use client"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Filter, Search } from "lucide-react"
import { CAMPUSES, CATEGORIES } from "../mock-data"

export function EventFilters() {
  return (
    <Card className="border-none shadow-sm sticky top-20 bg-white p-0 gap-0 space-y-0">
      <CardHeader className="p-4 border-b">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base flex items-center gap-2 font-bold text-gray-900">
            <Filter className="w-4 h-4 text-orange-600" /> Bộ lọc
          </CardTitle>
          <Button
            variant="ghost"
            size="sm"
            className="h-auto p-0 text-gray-400 hover:text-orange-600 text-xs font-medium"
          >
            Xóa tất cả
          </Button>
        </div>
      </CardHeader>

      {/* Content */}
      <CardContent className="p-4 flex flex-col gap-4">
        
        {/* Search Input */}
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-gray-400" />
          <Input
            id="filter-search"
            placeholder="Tìm kiếm..."
            className="pl-8 h-9 text-sm bg-gray-50 border-gray-200 focus-visible:ring-orange-500"
          />
        </div>

        {/* Accordion Menu */}
        <Accordion 
          type="multiple" 
          defaultValue={["category", "campus", "date"]} 
          className="w-full"
        >
          
          {/* SECTION 1: DANH MỤC */}
          <AccordionItem value="category" className="border-b-0">
            <AccordionTrigger className="py-2 text-sm font-bold text-gray-800 hover:text-orange-600 hover:no-underline">
              Danh mục
            </AccordionTrigger>
            <AccordionContent className="pb-2 pt-1">
              <div className="space-y-2">
                {CATEGORIES.map((cat) => (
                  <div key={cat.id} className="flex items-center justify-between group">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id={`cat-${cat.id}`}
                        className="h-4 w-4 rounded-[4px] data-[state=checked]:bg-orange-600 data-[state=checked]:border-orange-600 border-gray-300"
                      />
                      <Label
                        htmlFor={`cat-${cat.id}`}
                        className="cursor-pointer text-xs font-medium text-gray-600 group-hover:text-orange-600 transition-colors"
                      >
                        {cat.label}
                      </Label>
                    </div>
                    <span className="text-[10px] text-gray-400 font-medium">{cat.count}</span>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* SECTION 2: CƠ SỞ */}
          <AccordionItem value="campus" className="border-b-0">
            <AccordionTrigger className="py-2 text-sm font-bold text-gray-800 hover:text-orange-600 hover:no-underline">
              Cơ sở
            </AccordionTrigger>
            <AccordionContent className="pb-2 pt-1">
              <RadioGroup defaultValue="all" className="gap-2">
                {CAMPUSES.map((camp) => (
                  <div key={camp.id} className="flex items-center space-x-2 group">
                    <RadioGroupItem
                      value={camp.id}
                      id={`camp-${camp.id}`}
                      className="h-4 w-4 text-orange-600 border-gray-300 focus:text-orange-600"
                    />
                    <Label
                      htmlFor={`camp-${camp.id}`}
                      className="text-xs font-medium text-gray-600 cursor-pointer group-hover:text-orange-600 transition-colors"
                    >
                      {camp.label}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </AccordionContent>
          </AccordionItem>

          {/* SECTION 3: THỜI GIAN */}
          <AccordionItem value="date" className="border-b-0">
            <AccordionTrigger className="py-2 text-sm font-bold text-gray-800 hover:text-orange-600 hover:no-underline">
              Thời gian
            </AccordionTrigger>
            <AccordionContent className="pb-2 pt-1">
              <div className="grid gap-3">
                <div className="space-y-1">
                  <Label className="text-[10px] text-gray-500 uppercase font-bold tracking-wider">Từ</Label>
                  <div className="relative">
                     <Input type="date" className="bg-gray-50 text-xs h-9 block border-gray-200" />
                  </div>
                </div>
                <div className="space-y-1">
                  <Label className="text-[10px] text-gray-500 uppercase font-bold tracking-wider">Đến</Label>
                  <div className="relative">
                     <Input type="date" className="bg-gray-50 text-xs h-9 block border-gray-200" />
                  </div>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

        </Accordion>
      </CardContent>

      {/* Footer: pt-0 để kéo nút lên sát nội dung */}
      <CardFooter className="p-4 pt-0">
        <Button className="w-full h-9 text-sm font-bold bg-gray-900 hover:bg-gray-800 text-white shadow-sm transition-all active:scale-[0.98]">
          Áp dụng
        </Button>
      </CardFooter>
    </Card>
  )
}