import StarRating from "../components/StarRating";
import { ArrowDownIcon, ArrowUpIcon } from '@chakra-ui/icons'
import MessageSendR from "../components/MessageSendR";
import { IconButton } from "@chakra-ui/react";
import axios from 'axios'


export default function ReviewCard ({reviewData}) {

    const sendMessage = async (message) => {
    
        try {
          const response = await axios.post('http://localhost:5001/', { reply: message });
     
        } catch (error) {
          console.error('Error sending message:', error);
        }
      };

      const formatDate = (firebaseTimestamp) => {
        // Convert the Firebase timestamp to a JavaScript Date object
        const date = firebaseTimestamp.toDate();
      
        // Define the options for toLocaleDateString
        const options = {
          weekday: 'short', // short weekday name, e.g., "Wed"
          day: 'numeric',   // numeric day of the month, e.g., "6"
          month: 'short'    // short month name, e.g., "May"
        };
      
        // Format the date
        return date.toLocaleDateString('en-GB', options);
      };

return (
<>
    <div className="review">
      <div className="title-date">
        <p className="title">
          {/* <strong> Delicious Meal! </strong> */}
          <strong> {reviewData.title} </strong>
        </p>
        <p className="date">{reviewData.timestamp.slice(0, -4)}</p>
      </div>

      <div className="rating-author">
        <div className="rating">
          <StarRating rating={3} isRecipePage={true} />
        </div>
        <p className="author">{reviewData.author}</p>

      </div>
      <div className="description">
        <p>
        {reviewData.description}
        </p>
      </div>
      <div className="replies">
{console.log("replies:", reviewData.replies)}
{console.log("comment:", reviewData.replies[0].comment)}

    {reviewData.replies[0] ? reviewData.replies.map((reply, key)=> {
return (
    <div key={key} className="reply-container">
          <div className="reply-upvote">
            <p className="reply">
            {reply.comment}
            </p>
            <div className="upvote-container">
            {reply.votes}
              <strong> <p> </p></strong>
            
            <IconButton variant={"outline"} aria-label='Upvote' icon={<ArrowUpIcon color={"#90B4CE"} />} />
            <IconButton variant={"outline"} aria-label='Downvote' icon={<ArrowDownIcon color={"#9C0F20"}/>} />
              
            </div>
          </div>
    
          <div className="author-date">
            <p className="reply-author">{reply.author}</p>
            <p className="reply-date"></p>
          </div>
        </div>
)
        
    } )

        :
        <p> No replies</p>
 }


        {/* <div className="reply-container">
          <div className="reply-upvote">
            <p className="reply">
              I tried this recipe with my aunt and it was totally
              mindblowing! Got a little too much salt but it didn’t
              significanlty affect the flavor much. I’m glad it turned out
              pretty go
            </p>
            <div className="upvote-container">
              <strong> <p>4</p></strong>
            
            <IconButton variant={"outline"} aria-label='Upvote' icon={<ArrowUpIcon color={"#90B4CE"} />} />
            <IconButton variant={"outline"} aria-label='Downvote' icon={<ArrowDownIcon color={"#9C0F20"}/>} />
              
            </div>
          </div>
    
          <div className="author-date">
            <p className="reply-author">Annie</p>
            <p className="reply-date">03/32/54</p>
          </div>
        </div> */}

        {/* <div className="reply-container">
          <div className="reply-upvote">
            <p className="reply">
              I tried this recipe with my aunt and it was totally
              mindblowing! Got a little too much salt but it didn’t
              significanlty affect the flavor much. I’m glad it turned out
              pretty go
            </p>
            <div className="upvote-container">
              <strong> <p>4</p></strong>
            
            <IconButton variant={"outline"} aria-label='Upvote' icon={<ArrowUpIcon color={"#90B4CE"} />} />
            <IconButton variant={"outline"} aria-label='Downvote' icon={<ArrowDownIcon color={"#9C0F20"}/>} />
              
            </div>
          </div>
    

          <div className="author-date">
            <p className="reply-author">Annie</p>
            <p className="reply-date">03/32/54</p>
          </div>
        </div> */}
      </div>

      <div className="reply-textfield">
      <MessageSendR style={{width:"300px"}} sendMessage={sendMessage} placeholder={"Add a reply"} />
      </div>
      
    </div>
    </>
)
}