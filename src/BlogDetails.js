import { useParams, useHistory } from "react-router-dom";
import useFetch from "./useFetch";

const BlogDetails = () => {
  const { id } = useParams();
  const { data: blog, error, isPending } = useFetch(`http://localhost:8000/blogs/${id}`);
  const history = useHistory();
  const handleClick = () => {
    fetch(`http://localhost:8000/blogs/${blog.id}`, {
      method: 'DELETE'
    }).then(() => {
      history.push('/');
    }) 
  }

  return (
    <div className="blog-details">
      { isPending && <div>
                        <div class="spinner2">
                          <div class="bounce1"></div>
                          <div class="bounce2"></div>
                          <div class="bounce3"></div>
                        </div>
                      </div> 
      }
      { error && <div>{ error }</div> }
      { blog && (
        <article>
          <h2>{ blog.title }</h2>
          <p>Written by { blog.author }</p>
          <div>{ blog.body }</div>
          <button onClick={handleClick}>delete</button>
        </article>
      )}
    </div>
  );
}
 
export default BlogDetails;