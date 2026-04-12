type Props = {
    params: Promise<{ id: string }>,  //:param
    searchParams: Promise<{ [key: string]: string | string [] | undefined}>, //?searchParam=...?
}

export default async function Location( { params, searchParams } : Props) {
    const { id : locationId } = await params;
    // Fetch location based on { locationId }
    return (
    <>
        Location Page {locationId}
    </>
  );
}