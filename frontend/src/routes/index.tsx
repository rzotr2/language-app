import { createFileRoute } from "@tanstack/react-router";
import HomePageMain from "../components/HomePageMain.tsx";

export const Route = createFileRoute("/")({
    component: HomePage,
});

function HomePage() {
    return (
        <>
            <HomePageMain />
        </>
    );
}

export default HomePage;
