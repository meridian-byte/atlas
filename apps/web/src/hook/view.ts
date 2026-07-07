import { APP_NAMES_ATLAS, ASIDE_VIEW_NAMES } from '@repo/constants';
import { useStoreView } from '@repo/store';

export const useView = () => {
  const viewValue = useStoreView((s) => s.view?.view);
  const setViewValue = useStoreView((s) => s.setViewValue);

  const showViewPave = () => {
    if (viewValue != APP_NAMES_ATLAS.PAVE) {
      setViewValue(APP_NAMES_ATLAS.PAVE);
    }
  };

  const showViewJot = () => {
    if (viewValue != APP_NAMES_ATLAS.JOT) {
      setViewValue(APP_NAMES_ATLAS.JOT);
    }
  };

  const showViewStride = () => {
    if (viewValue != APP_NAMES_ATLAS.STRIDE) {
      setViewValue(APP_NAMES_ATLAS.STRIDE);
    }
  };

  const showViewPrime = () => {
    if (viewValue != APP_NAMES_ATLAS.PRIME) {
      setViewValue(APP_NAMES_ATLAS.PRIME);
    }
  };

  const showViewTally = () => {
    if (viewValue != APP_NAMES_ATLAS.TALLY) {
      setViewValue(APP_NAMES_ATLAS.TALLY);
    }
  };

  return {
    viewValue,
    setViewValue,
    showViewPave,
    showViewJot,
    showViewStride,
    showViewPrime,
    showViewTally,
  };
};

export const useSubView = () => {
  const subViewValue = useStoreView((s) => s.view?.subView);
  const setSubViewValue = useStoreView((s) => s.setSubViewValue);

  const showSubViewPave = () => {};

  const showSubViewJot = () => {};

  const showSubViewStride = () => {};

  const showSubViewPrime = () => {};

  const showSubViewTally = () => {};

  return {
    subViewValue,
    setSubViewValue,
    showSubViewPave,
    showSubViewJot,
    showSubViewStride,
    showSubViewPrime,
    showSubViewTally,
  };
};

export const useViewAside = () => {
  const asideViewValue = useStoreView((s) => s.view?.asideView);
  const setAsideViewValue = useStoreView((s) => s.setAsideViewValue);

  const showNewEvent = () => {
    if (asideViewValue != ASIDE_VIEW_NAMES.NEW.EVENT) {
      setAsideViewValue(ASIDE_VIEW_NAMES.NEW.EVENT);
    }
  };

  const showNewNote = () => {
    if (asideViewValue != ASIDE_VIEW_NAMES.NEW.NOTE) {
      setAsideViewValue(ASIDE_VIEW_NAMES.NEW.NOTE);
    }
  };

  const showNewTask = () => {
    if (asideViewValue != ASIDE_VIEW_NAMES.NEW.TASK) {
      setAsideViewValue(ASIDE_VIEW_NAMES.NEW.TASK);
    }
  };

  return { asideViewValue, setAsideViewValue, showNewEvent, showNewNote, showNewTask };
};
