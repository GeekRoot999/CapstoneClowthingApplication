import CategoryItem from '../Category-item/Category-item.component.jsx';
import './Directory.style.scss'

export default function directory({categories}){
    return(
        <div className="directory-container">
            {categories.map((category) => (
                <CategoryItem key={category.id} category={category} />
            ))}
        </div>
    )
}