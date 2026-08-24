import { Link } from 'react-router-dom'
import './navbar.css'
import logo from '../../assets/symbol.png'
import search from '../../assets/search1.svg'
import arrow from '../../assets/arrow-down.svg'
import searchWt from '../../assets/search.svg'
import favorite from '../../assets/favorite.svg'
import { useWishlist } from '../context/use-wishlist'
import { userAuth } from '../context/auth'
import { signOut } from 'firebase/auth'
import { auth } from '../firebase/firebase'



function Navbar(props){
    const {toggleModal,toggleModalSell,searchTerm='',onSearchChange} =props
    const {wishlist} = useWishlist()
    const {user} = userAuth()
    const userName = user?.displayName || user?.email?.split('@')[0]

    const handleLogout = async () => {
        try {
            await signOut(auth)
        } catch (error) {
            console.error('Failed to log out:', error)
        }
    }
    return (
        <>
    <div>
        <nav className='fixed z-50 w-full overflow-auto p-2 pl-3 pr-3 shadow-md bg-slate-100 border-b-4 border-solid border-b-white'>
            <Link to="/" className="shrink-0" aria-label="Go to home page">
                <img src={logo} alt="OLX" className='w-12'/>
            </Link>
            <div className='relative location-search ml-5'>
            <img src={search} alt="" className='absolute top-4 left-2 w-5'/>
            <input placeholder='Search city, area, or locality...' className='w-[50px] sm:w-[150px] md:w-[250] lg:w-[270px] p-3 pl-8 pr-8 border-black border-solid border-2 rounded-md placeholder:text-ellipsis focus:outline-none focus:border-teal-300' type="text" />
            <img src={arrow} alt="" className='absolute top-4 right-3 w-5 cursor-pointer'/>
            </div>

             <div className="ml-5 mr-2 relative w-full main-search">
                    <input
                        placeholder='Find Cars, Mobile Phones, and More...'
                        className='w-full p-3 border-black border-solid border-2 rounded-md placeholder:text-ellipsis focus:outline-none focus:border-teal-300'
                        type="search"
                        value={searchTerm}
                        onChange={(event) => onSearchChange?.(event.target.value)}
                        aria-label="Search products"
                    />
                    <div style={{ backgroundColor: '#33858e' }} className="flex justify-center items-center absolute top-0 right-0 h-full rounded-e-md w-12">
                        <img className="w-5 filter invert" src={searchWt} alt="Search Icon" />
                    </div>
                </div>

                <button
                    type="button"
                    className="mx-1 flex shrink-0 items-center gap-2 rounded-md px-2 py-2 font-bold text-[#002f34] hover:bg-gray-200 sm:ml-5 sm:mr-4"
                    aria-label="Choose language"
                >
                    <span>English</span>
                    <img src={arrow} alt="" className="h-5 w-5 shrink-0" />
                </button>

                <Link to="/wishlist" className="relative mr-4 flex shrink-0 items-center" aria-label="Wishlist">
                    <img src={favorite} alt="" className="h-6 w-6" />
                    {wishlist.length > 0 && (
                        <span className="absolute -right-2 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#002f34] px-1 text-xs text-white">
                            {wishlist.length}
                        </span>
                    )}
                </Link>
                {user ? (
                    <div className="flex shrink-0 items-center gap-3">
                        <span className="max-w-32 truncate font-semibold text-[#002f34]" title={user.email || userName}>
                            {userName || 'User'}
                        </span>
                        <button
                            type="button"
                            onClick={handleLogout}
                            className="rounded-md border-2 border-[#002f34] px-3 py-1.5 text-sm font-semibold text-[#002f34] hover:bg-[#002f34] hover:text-white"
                        >
                            Logout
                        </button>
                    </div>
                ) : (
                    <button type="button" onClick={toggleModal} className="shrink-0 underline underline-offset-4">Login</button>
                )}
                <button type="button" onClick={toggleModalSell} className="ml-3 shrink-0 rounded-full bg-[#002f34] px-5 py-2 font-bold text-white">Sell</button>
        </nav>
    </div>
    </>
)
}

export default Navbar
