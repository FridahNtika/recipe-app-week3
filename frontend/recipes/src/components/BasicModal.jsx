import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
} from "@chakra-ui/react";

export default function BasicModal({ isOpen, onClose }) {
  return (
    <>
      {/* <Button onClick={onOpen}>Open Modal</Button> */}

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Nutrition Facts</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <ul>
              <li>120 Calories</li>
              <li>120 Calories</li>
              <li>120 Calories</li>
              <li>120 Calories</li>
              <li>120 Calories</li>
            </ul>
          </ModalBody>

          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
