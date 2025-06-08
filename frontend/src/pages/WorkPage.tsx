import HeaderGeneral from "../components/HeaderGeneral.tsx";
import FooterGeneral from "../components/FooterGeneral.tsx";
import WorkPageMain from "../components/WorkPageMain.tsx";

function WorkPage() {
    return (
        <>
            <div className="flex flex-col justify-between min-h-[100vh]">
                <HeaderGeneral />
                <WorkPageMain />
                <FooterGeneral />
            </div>
        </>
    )
}

export default WorkPage
