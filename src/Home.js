import useFetch from './useFetch'
import BlogList from "./BlogList";

const Home = () => {
  const { error, isPending, data: blogs } = useFetch('http://localhost:8000/blogs')

  return (
    <div className="home">
      { error && <div>{ error }</div> }
      { isPending && <div>
                        <div class="spinner">
                            <div class="rect1"></div>
                            <div class="rect2"></div>
                            <div class="rect3"></div>
                            <div class="rect4"></div>
                            <div class="rect5"></div>
                          </div>
                      </div> 
      }
      {blogs && <BlogList blogs={blogs} />}
    </div>
  );
}
 
export default Home;