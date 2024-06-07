import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";

export default function BasicModal({ totalNutrients, isOpen, onClose }) {
  return (
    <>
      {/* <Button onClick={onOpen}>Open Modal</Button> */}

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>More Nutrients </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <ul className="all-nutrients">
              {totalNutrients &&
                Object.keys(totalNutrients).map((key) => (
                  <li key={key} className="modal-nutrient">•{" "}
                    {totalNutrients[`${key}`]?.label}:{" "}
                    {Math.round(totalNutrients[`${key}`]?.quantity)}{" "}
                    {totalNutrients[`${key}`]?.unit}
                  </li>
                ))}
            </ul>
          </ModalBody>

          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
