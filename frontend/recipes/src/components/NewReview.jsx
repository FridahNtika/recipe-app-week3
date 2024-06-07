import StarRating from "../components/StarRating";
import {
  FormControl,
  FormLabel,
  FormHelperText,
  Input,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Button,
} from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
import { useToast, useDisclosure } from "@chakra-ui/react";

export default function NewReview({fetchReviews, recipeID, userId, author}) {
const [title, setTitle] = useState('')
const [description, setDescription] = useState('')
const [rating, setRating] = useState(3)
const toast = useToast();

const handleTitleChange = (e) => {
    setTitle(e.target.value)
}

const handleDescriptionChange = (e) => {
    setDescription(e.target.value)
}

const handleRatingChange = (value) => {
    setRating(value)
}

const handleSubmit = async () => {
    toast({
        title: "Review Submitted!",
        duration: 1000,
        position: "bottom-left",
      });

      console.log("recipe id in createNew: ", recipeID)

    const review = {
        recipeId:recipeID,
        author: author,
        userId:userId,
        title:title,
        description:description,
        rating:rating
    }

    try {
        const response = await axios.post("http://localhost:5001/reviews/new-review", review);
        
      } catch (error) {
        console.log("Error adding review: ", error);
      }
    fetchReviews()
    setTitle('')
    setDescription('')
    setRating(3)

}

  const sendMessage = async (message) => {
    try {
      const response = await axios.post("http://localhost:5001/", {
        reply: message,
      });
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <>
      <div className="new-review">
        <div className="title-date">
          <p className="title">
            <strong> Add a review</strong>
          </p>
        </div>

        <div className="form">
          <FormControl>
            <FormLabel>Review Title</FormLabel>
            <Input size="lg" value={title} onChange={handleTitleChange} />
            {/* <FormHelperText>We will never share your email.</FormHelperText> */}
          </FormControl>
        </div>
        <div className="form">
          <FormControl>
            <FormLabel>Description</FormLabel>
            <Input size="lg" value={description} onChange={handleDescriptionChange}/>
            {/* <FormHelperText>We will never share your email.</FormHelperText> */}
          </FormControl>
        </div>

        <div className="form">
          <FormControl>
            <FormLabel>Amount</FormLabel>
            <NumberInput max={5} min={0} value={rating} onChange={handleRatingChange}>
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </FormControl>
        </div>

        <div className="new-rating rating">
          <StarRating rating={3} isRecipePage={true} />
        </div>


        <div className="submit-review-container">
            <Button className="submit-review-button" onClick={handleSubmit}> Submit Review</Button>
        </div>
      </div>
    </>
  );
}
