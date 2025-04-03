
import { toast } from "react-hot-toast";



const Tag = ({ tag, tagIndex }) => {

    const tags=[
        "AI",
        "Science",
        "Technology",
        "Health",
    ]

    // const []

    return (
        <div className="relative py-1 mt-2 mr-2 px-5 bg-white rounded-full inline-block hover:bg-opacity-50 pr-10">
          

            <p
                className="outline-none text-sm"

                onClick={(e) => {
                    // onclick make content editable
                    e.target.setAttribute("contentEditable", true)
                    e.target.focus();
                }}


                onKeyDown={(e) => {
                    if (e.keyCode == 13 || e.keyCode == 188) {
                        e.preventDefault()
                        let currentTag = e.target.innerText
                        if (!tags.includes(currentTag) && tag.length) {
                            
                            tags[tagIndex] = currentTag
                            // tags[tagIndex] = currentTag.replace(/\s+/g,"").trim()
                            // setBlog({ ...blog, tags })
                        } else {
                            toast.error("Tag already included")
                        }

                        // after enter or , content not editable 
                        e.target.setAttribute("contentEditable", false)
                    }
                }}

            >{tag}</p>

            <button
                className=" absolute right-3 top-1/2 flex items-center rounded-full -translate-y-1/2 mt-[2px]"
                onClick={() => {
                    tags = tags.filter(t => t != tag)
                    // setBlog({ ...blog, tags })
                    toast.error("Tag deleted")
                }}
            >
                <i className="fi fi-br-cross text-[10px] pointer-events-none"></i>
            </button>
        </div>
    )

}

export default Tag;