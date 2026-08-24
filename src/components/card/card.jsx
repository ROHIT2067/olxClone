import { Link } from 'react-router-dom'
import Favorite from '../../assets/favorite.svg'
import { useWishlist } from '../context/use-wishlist'


const Card = ({items, title = "Fresh recommendations", emptyMessage = "No products found."}) => {
  const { isWishlisted, toggleWishlist } = useWishlist()

  return (
    <div className='min-h-screen px-5 pb-10 pt-24 sm:px-15 md:px-30 lg:px-40'>

   <h1 style={{ color: '#002f34' }} className="text-2xl">{title}</h1>

      {items.length === 0 && (
        <div className="mt-8 rounded-lg border border-gray-200 bg-gray-50 p-10 text-center text-gray-600">
          {emptyMessage}
        </div>
      )}

      <div  className='grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 pt-5' >
        {items.map((item)=> (
          <div key={item.id}
          style={{borderWidth: '1px', borderColor: 'lightgray'}} 
          className='relative w-full h-72 rounded-md border-solid bg-gray-50 overflow-hidden cursor-pointer'
          >
            <Link to={`/details/${item.id}`} state={{item}} className="block h-full">

            {/* Display Images */}
            <div  className='w-full flex justify-center p-2 overflow-hidden'>
              <img
              className='h-36 object-contain'
               src={item.imageUrl || 'https://via.placeholder.com/150'}  alt={item.title} />

            </div>

            {/* Display details */}
            <div  className='details p-1 pl-4 pr-4' >
            <h1 style={{ color: '#002f34' }} className="font-bold text-xl">₹ {item.price}</h1>
            <p className="text-sm pt-2">{item.category}</p>
            <p className="pt-2">{item.title}</p>
            </div>
            </Link>

            <button
              type="button"
              onClick={() => toggleWishlist(item)}
              className={`absolute right-3 top-3 flex items-center justify-center rounded-full p-2 shadow-sm ${
                isWishlisted(item.id) ? "bg-rose-100" : "bg-white"
              }`}
              aria-label={isWishlisted(item.id) ? "Remove from wishlist" : "Add to wishlist"}
              title={isWishlisted(item.id) ? "Remove from wishlist" : "Add to wishlist"}
            >
              <img
                className={`w-5 ${isWishlisted(item.id) ? "opacity-100" : "opacity-70"}`}
                src={Favorite}
                alt=""
              />
            </button>
          </div>

        ))}

      </div>
      
    </div>
  )
}

export default Card
