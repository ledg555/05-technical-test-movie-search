import { useEffect, useState, useRef } from "react";

export function useSearch() {
  const [search, updateSearch] = useState("");
  const [inputError, setInputError] = useState<string | null>(null);
  const isFirstInput = useRef(true);
  useEffect(() => {
    if (isFirstInput.current) {
      isFirstInput.current = !search;
      return;
    }
    if (!search) {
      setInputError("Por favor, introduce el nombre de una película");
      return;
    }
    if (search.length < 2) {
      setInputError("Por favor, introduce al menos dos carácteres");
      return;
    }
    setInputError(null);
  }, [search]);
  return {search, inputError, updateSearch};
}
