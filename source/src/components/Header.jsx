import { useIsFetching, useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router-dom";

const Header = () => {
    const queryClient = useQueryClient();
    const data = queryClient.getQueriesData(['post']);
    const isFetching = useIsFetching(['create-post'])
    console.log(data);
    console.log(isFetching);

    return (
        <div style={{ display:"flex", gap:10}}>
            <Link to="/">Home</Link>
            <Link to="/loadmore">Load More</Link>
            <Link to="/page">Page</Link>
            <Link to="/dependent">Dependent</Link>
            <Link to="/json-server">Json-server</Link>
            <Link to="/react-query">React query</Link>
            <Link to="/react">React api</Link>
        </div>
    )
}

export default Header;