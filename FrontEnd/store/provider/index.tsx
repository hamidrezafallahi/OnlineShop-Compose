import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import AppReduxStore, { persistor } from '@store/index';

const ReduxProvider = (props: any) => {
  return (
    <Provider store={AppReduxStore}>
      <PersistGate
        loading={
          <div className="absolute inset-0 flex flex-col justify-center items-center gap-3">
        <div className="mx-auto mb-4 border-primary border-t-2 border-b-2 rounded-full w-16 h-16 animate-spin"></div>
          </div>
        }
        persistor={persistor}
      >
        {props.children}
      </PersistGate>
    </Provider>
  );
};

export default ReduxProvider;
