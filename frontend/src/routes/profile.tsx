import { createFileRoute, useSearch } from "@tanstack/react-router";
import type { ProfileSearchParams } from "../types";
import { AboutPage } from "../components/profile/AboutPage.tsx";
import { ResumePage } from "../components/profile/ResumePage.tsx";
import { ProjectsPage } from "../components/profile/ProjectsPage.tsx";

export const Route = createFileRoute("/profile")({
    component: ProfilePage,
});

function ProfilePage() {
    const search: ProfileSearchParams = useSearch({ from: "/profile" });
    const currentSearchParameter = search.page;

    return (
        <>
            <div className="flex-1">
                {currentSearchParameter === "about" && (
                    <div>
                        <AboutPage />
                    </div>
                )}
                {currentSearchParameter === "resume" && (
                    <div>
                        <ResumePage />
                    </div>
                )}
                {currentSearchParameter === "projects" && (
                    <div>
                        <ProjectsPage />
                    </div>
                )}
            </div>
        </>
    );
}

export default ProfilePage;
