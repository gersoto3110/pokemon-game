import { useEffect, useReducer } from "react";

const types = {
  texts: "UPDATE_TEXTS",
  typing: "UPDATE_TYPING",
  pausing: "PAUSING",
  deleting: "DELETING",
  phase: "UPDATE_PHASE",
  nextIndex: "NEXT_INDEX",
  restart: "RESTART",
  fasterTyping: "FASTER_TYPING",
  normalTyping: "NORMAL_TYPING",
};

const initState = {
  texts: null,
  typed: "",
  phase: types.typing,
  index: 0,
  times: {
    typing: 150,
    pausing: 1000,
    deleting: 50,
  },
};

function reducer(prevState, action) {
  switch (action.type) {
    case types.typing:
      return {
        ...prevState,
        typed: action.payload,
      };
    case types.phase:
      return {
        ...prevState,
        phase: action.payload,
      };
    case types.nextIndex:
      return {
        ...prevState,
        index: prevState.index + 1,
      };
    case types.texts:
      return {
        ...prevState,
        texts: action.payload,
      };
    case types.restart:
      return {
        ...initState,
      };
    case types.fasterTyping:
      return {
        ...prevState,
        times: {
          ...prevState.times,
          typing: 50,
        },
      };
    case types.normalTyping:
      return {
        ...prevState,
        times: {
          ...prevState.times,
          typing: initState.times.typing,
        },
      };
    default:
      return prevState;
  }
}

const useTyping = () => {
  const [state, dispatch] = useReducer(reducer, initState);

  useEffect(() => {
    if (!state.texts) {
      return;
    }

    switch (state.phase) {
      case types.typing: {
        const nextTypedText = state.texts[state.index].slice(
          0,
          state.typed.length + 1
        );

        if (nextTypedText === state.typed) {
          dispatch({ type: types.phase, payload: types.pausing });
          return;
        }

        const timeout = setTimeout(() => {
          dispatch({ type: types.typing, payload: nextTypedText });
        }, state.times.typing);

        return () => {
          clearTimeout(timeout);
        };
      }
      case types.deleting: {
        if (!state.typed) {
          dispatch({ type: types.nextIndex });
          if (state.index === state.texts.length - 1) {
            dispatch({ type: types.restart });
          } else {
            dispatch({ type: types.phase, payload: types.typing });
          }
          return;
        }

        const nextDeleting = state.texts[state.index].slice(
          0,
          state.typed.length - 1
        );
        const timeout = setTimeout(() => {
          dispatch({ type: types.typing, payload: nextDeleting });
        }, state.times.deleting);

        return () => {
          clearTimeout(timeout);
        };
      }
      case types.pausing: {
        const timeout = setTimeout(() => {
          dispatch({ type: types.phase, payload: types.deleting });
        }, state.times.pausing);

        return () => {
          clearTimeout(timeout);
        };
      }
      default:
        return;
    }
  }, [state]);

  const handleTexts = (texts) => {
    dispatch({ type: types.texts, payload: texts });
  };

  const handleFasterTyping = () => {
    dispatch({ type: types.fasterTyping });
  };

  const handleNormalTyping = () => {
    dispatch({ type: types.normalTyping });
  };

  const startTyped = !state.texts;

  return {
    typed: state.typed,
    startTyped,
    handleTexts,
    handleFasterTyping,
    handleNormalTyping,
  };
};

export default useTyping;
