import { ChevronLeft, ChevronRight } from "lucide-react"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination"

export function EventPagination() {
  return (
    <div className="flex justify-center mt-10">
      <Pagination>
        <PaginationContent>
          
          <PaginationItem>
            <PaginationLink 
              href="#" 
              size="icon" 
              className="hover:text-orange-600 hover:bg-orange-50"
              aria-label="Previous"
            >
              <ChevronLeft className="h-4 w-4" />
            </PaginationLink>
          </PaginationItem>

          <PaginationItem>
            <PaginationLink
              href="#"
              isActive
              className="bg-orange-600 hover:bg-orange-700 text-white border-orange-600 hover:text-white"
            >
              1
            </PaginationLink>
          </PaginationItem>

          <PaginationItem>
            <PaginationLink href="#" className="hover:text-orange-600 hover:bg-orange-50">
              2
            </PaginationLink>
          </PaginationItem>

          <PaginationItem>
            <PaginationLink href="#" className="hover:text-orange-600 hover:bg-orange-50">
              3
            </PaginationLink>
          </PaginationItem>

          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>

          <PaginationItem>
            <PaginationLink 
              href="#" 
              size="icon" 
              className="hover:text-orange-600 hover:bg-orange-50"
              aria-label="Next"
            >
              <ChevronRight className="h-4 w-4" />
            </PaginationLink>
          </PaginationItem>

        </PaginationContent>
      </Pagination>
    </div>
  )
}