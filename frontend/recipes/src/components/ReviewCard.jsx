import StarRating from "../components/StarRating";
import { ArrowDownIcon, ArrowUpIcon } from '@chakra-ui/icons'
import MessageSend from "../components/MessageSend";
import { IconButton } from "@chakra-ui/react";
import axios from 'axios'


export default function ReviewCard () {

    const sendMessage = async (message) => {
    
        try {
          const response = await axios.post('http://localhost:5001/', { reply: message });
     
        } catch (error) {
          console.error('Error sending message:', error);
        }
      };

return (
<>
    <div className="review">
      <div className="title-date">
        <p className="title">
          <strong> Delicious Meal! </strong>
        </p>
        <p className="date">27/09/23</p>
      </div>

      <div className="rating-author">
        <div className="rating">
          <StarRating rating={3} isRecipePage={true} />
        </div>
        <p className="author">Milton</p>

      </div>
      <div className="description">
        <p>
          I tried this recipe with my aunt and it was totally mindblowing!
          Got a little too much salt but it didn’t significanlty affect
          the flavor much. I’m glad it turned out pretty go
        </p>
      </div>
      <div className="replies">
        <div className="reply-container">
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
        </div>

        <div className="reply-container">
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
        </div>
      </div>

      <div className="reply-textfield">
      <MessageSend sendMessage={sendMessage} placeholder={"Add a reply"} />
      </div>
      
    </div>
    </>
)
}