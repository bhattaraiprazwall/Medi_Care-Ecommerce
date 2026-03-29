import { Home, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { SiSuno } from "react-icons/si";
import Cookies from "js-cookie";

export default function AdminPanelNavbar() {
    const router = useRouter()

    function onLanding() {

        router.replace('/')

    }
    function admin() {

        router.replace('/admin/product')

    }
    return (
        <div className="flex justify-between space-x-7  shadow-lg rounded-3xl p-5 my-6 ">

            <div className='flex items-center ' onClick={onLanding}>
                <SiSuno size={25} />
                <label className='p-2 font-medium cursor-pointer'>
                    Life Harmony
                </label>
            </div>


            <div className="flex items-center space-x-7" >
                <h1 className="text-6xl font-bold tracking-widest cursor-pointer" onClick={admin}>ADMIN PANEL</h1>
            </div>


            <div className="flex space-x-2 text-center items-center">
                <button className=' rounded-3xl cursor-pointer flex px-6 ' onClick={() => router.push('/home')}>
                    <Home className="mx-2" /> Home
                </button>
                <LogOut className=' cursor-pointer' onClick={() => {
                    Cookies.remove('access_token')
                    router.push('/auth/login')
                }} />

            </div>
        </div>
    );
}
