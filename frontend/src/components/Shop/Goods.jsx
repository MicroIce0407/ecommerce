import { Link } from "react-router-dom";

function Goods(props) {
  return (
    <li className="list-none ">
      <Link to={`/${props._id}`} className="block">
        <div
          key={props._id}
          className="max-w-sm bg-white rounded-lg shadow-md overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-lg"
        >
          <img
            src={props.image}
            alt={props.name}
            className="w-full h-48 object-cover transition duration-300"
          />
          <div className="p-5">
            <h2 className="text-xl font-bold text-gray-800">{props.title}</h2>
            <p className="text-gray-600 mt-2">${props.price}</p>
            <button className="mt-4 w-full bg-blue-500 text-white py-2 rounded-lg shadow-md hover:bg-blue-600 hover:shadow-lg transition duration-200">
              詳細頁面
            </button>
          </div>
        </div>
      </Link>
    </li>
  );
}

export default Goods;
