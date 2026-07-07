import { APP_NAMES_ATLAS, ASIDE_VIEW_NAMES, SUBVIEW_NAMES } from '@repo/constants';
import { useStoreView } from '@repo/store';

export const useView = () => {
  const viewValue = useStoreView((s) => s.view?.view);
  const view = useStoreView((s) => s.view);
  const setView = useStoreView((s) => s.setView);

  const showViewPave = () => {
    if (!view) return;

    if (viewValue != APP_NAMES_ATLAS.PAVE) {
      setView({ ...view, subView: null, view: APP_NAMES_ATLAS.PAVE });
    }
  };

  const showViewJot = () => {
    if (!view) return;

    if (viewValue != APP_NAMES_ATLAS.JOT) {
      setView({ ...view, subView: null, view: APP_NAMES_ATLAS.JOT });
    }
  };

  const showViewStride = () => {
    if (!view) return;

    if (viewValue != APP_NAMES_ATLAS.STRIDE) {
      setView({ ...view, subView: null, view: APP_NAMES_ATLAS.STRIDE });
    }
  };

  const showViewPrime = () => {
    if (!view) return;

    if (viewValue != APP_NAMES_ATLAS.PRIME) {
      setView({ ...view, subView: null, view: APP_NAMES_ATLAS.PRIME });
    }
  };

  const showViewTally = () => {
    if (!view) return;

    if (viewValue != APP_NAMES_ATLAS.TALLY) {
      setView({ ...view, subView: null, view: APP_NAMES_ATLAS.TALLY });
    }
  };

  return {
    viewValue,
    showViewPave,
    showViewJot,
    showViewStride,
    showViewPrime,
    showViewTally,
  };
};

export const useSubView = () => {
  const viewValue = useStoreView((s) => s.view?.view);
  const subViewValue = useStoreView((s) => s.view?.subView);
  const view = useStoreView((s) => s.view);
  const setView = useStoreView((s) => s.setView);

  const showSubViewPave = () => {};

  const showSubViewJot = () => {};

  const showSubViewStride = (v: string) => {
    if (!view) return;

    if (subViewValue != v) {
      setView({
        ...view,
        view: viewValue == APP_NAMES_ATLAS.STRIDE ? view.view : APP_NAMES_ATLAS.STRIDE,
        subView: v,
      });
    }
  };

  const showSubViewPrime = () => {};

  const showSubViewTally = () => {};

  return {
    viewValue,
    subViewValue,
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

  const showAsideViewPave = (v: string) => {
    if (asideViewValue != v) {
      setAsideViewValue(v || ASIDE_VIEW_NAMES.NEW.PAVE.EVENT);
    }
  };

  const showAsideViewJot = (v: string) => {
    if (asideViewValue != v) {
      setAsideViewValue(v || ASIDE_VIEW_NAMES.NEW.JOT.NOTE);
    }
  };

  const showAsideViewStride = (v: string) => {
    if (asideViewValue != v) {
      setAsideViewValue(v || ASIDE_VIEW_NAMES.NEW.STRIDE.TASK);
    }
  };

  return {
    asideViewValue,
    setAsideViewValue,
    showAsideViewPave,
    showAsideViewJot,
    showAsideViewStride,
  };
};
