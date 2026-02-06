import Link from "next/link";
import {_Sidebar} from "@/src/widgets/HomeMenu/_Sidebar";
export default function MainMenuWidget() {
    return (<>
        <nav>
            <_Sidebar/>
        </nav>
    </>)
}