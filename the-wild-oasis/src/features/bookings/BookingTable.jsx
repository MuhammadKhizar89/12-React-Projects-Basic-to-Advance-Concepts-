import BookingRow from "./BookingRow";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import useBookings from "../bookings/useBookings";
import Spinner from "../../ui/Spinner";
import Pagination from "../../ui/Pagination";

function BookingTable() {
    const {BookingData:bookings, isPending,count} = useBookings();
    // console.log(bookings);
    if (isPending) return <Spinner />;
    if (bookings?.length===0) return <p>No data</p>;
    // console.log(BookingData);

    return (
        <Menus>
            <Table coulmns="1fr 1fr 1fr 1fr 1fr 0rem">
                <Table.Header>
                    <div>Cabin</div>
                    <div>Guest</div>
                    <div>Dates</div>
                    <div>Status</div>
                    <div>Amount</div>
                    <div></div>
                </Table.Header>        
                <Table.Body data={bookings} render={(booking) => <BookingRow key={booking.id} booking={booking} />} />
            </Table>
            <Table.Footer>
              <Pagination count={count}/>
            </Table.Footer>
        </Menus>
    );
}

export default BookingTable;
