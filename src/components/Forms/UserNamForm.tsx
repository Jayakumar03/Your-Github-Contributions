import {
  Button,
  Flex,
  IconButton,
  Input,
  Tooltip,
  useClipboard,
} from "@chakra-ui/react";
import { useEffect, useMemo, useState } from "react";

import { useNavigate } from "react-router-dom";
import { HiOutlineClipboardCopy } from "react-icons/hi";
import { showToastMessage } from "../../utils/toastUtils";

const UserNameForm = () => {
  const navigate = useNavigate();
  const { onCopy, setValue, hasCopied } = useClipboard("");
  const [userName, setUserName] = useState<string>("");

  useMemo(() => {
    const url = `${window.location.protocol}//${window.location.host}/contributions/${userName}`;

    setValue(url);

    return url;
  }, [userName, setValue]);

  useEffect(() => {
    if (hasCopied) {
      showToastMessage("success", "Link copied successfully!");
    }
  }, [hasCopied]);

  const handleSubmit = ()=>{
    userName && navigate(`/contributions/${userName}`)
  }

  return (
    <form onSubmit={handleSubmit}>
      <Flex wrap="wrap" gap={4} justifyContent="center" alignItems="center">
        <Input
          width={{ base: "250px", lg: "300px" }}
          spellCheck={false}
          type="search"
          autoFocus
          placeholder="Enter Your GitHub Username..."
          value={userName}
          onChange={(e) => {
            const { value } = e.target;
            setUserName(value);
          }}
        />
        <Tooltip label="Generate">
          <Button
            px={4}
            colorScheme="teal"
            variant="solid"
            type="submit"
          >
            Generate
          </Button>
        </Tooltip>
        <Tooltip label="Copy Contributions Page URL">
          <IconButton
            aria-label="contributions-page-link"
            icon={<HiOutlineClipboardCopy />}
            onClick={() => userName && onCopy()}
          />
        </Tooltip>
      </Flex>
      </form>
  );
};

export default UserNameForm;
