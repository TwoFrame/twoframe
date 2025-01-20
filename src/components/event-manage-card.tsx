import { EventData } from "@/app/dashboard/manage/[slug]/events/types";
import { Button } from "@nextui-org/button";
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/dropdown";
import { Ellipsis, Eye } from "lucide-react";
import Link from "next/link";

//CHATGPT CREATED THESE HELPERS NICE
function formatDatetime(inputDatetime: string) {
  // Create a Date object from the input string
  const dt = new Date(inputDatetime);

  // Extract the date parts
  const month = dt.toLocaleString('default', { month: 'short' }); // Short month name
  const day = dt.getDate(); // Day of the month
  const hours = dt.getHours(); // Hours in 24-hour format
  const minutes = dt.getMinutes(); // Minutes
  const ampm = hours >= 12 ? 'PM' : 'AM'; // AM/PM

  // Convert to 12-hour format
  const hours12 = hours % 12 || 12;
  const formattedMinutes = minutes < 10 ? '0' + minutes : minutes; // Add leading zero to minutes if necessary

  // Format the final output
  return `${month} ${day}, ${hours12}:${formattedMinutes}${ampm}`;
}



export default function EventManageCard({
    event,
  }: {
    event: EventData;
  }) {

    return (
        <tr className=" h-24">
        <td>
         <h1 className="text-2xl m-0 p-0">{event.title}</h1>
         <h3 className="text-sm text-color-light-grey mt-[-5px pl-1">{formatDatetime(event.start_date)}</h3>
        </td>
        <td>
          <p className="text-xs text-center font-semibold bg-[#17541B] text-color-light-green py-1 px-2 rounded-lg max-w-[52px]">
          {event.attendees}
          </p>
        </td>
        <td className="text-color-light-grey">
          {/* TODO: MAKE IT SAY STuFF LIKE "TWO WEEKS AGO" OR "ONE DAY AGO" etc */}
          {/* TODO: THINKING OF ALSO JUST MAKING THIS COLUMN IN THE TABLE DISPLAY THE GAME CAN DISCUSS*/}
        {formatDatetime(event.created_at)} 
        </td> 
        <td className="text-center">
          <Dropdown>
            <DropdownTrigger>
              <Button isIconOnly variant="light" size="sm">
                <Ellipsis size={16} />
              </Button>
            </DropdownTrigger>
            <DropdownMenu aria-label="Tournament Card Actions">
              <DropdownItem
                key="view"
          
                as={Link}
                href={`/`}
              >
              Manage
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </td>

      </tr>
    );
  }