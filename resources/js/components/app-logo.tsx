import logo from '@/assets/images/logo-escuela.png';
export default function AppLogo() {
    return (
        <>
            <img src={logo} alt="Esc. Prim. Fed. Francisco Villa" className='w-8 h-8'/>
            <div className="ml-1 grid flex-1 text-left text-sm">
                <span className="mb-0.5 truncate leading-none font-semibold">SIPAC</span>
            </div>
        </>
    );
}
