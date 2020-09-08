import {useEffect} from 'react';
import {withRouter} from 'react-router-dom';
import {useAnalytics} from 'reactfire';

const PageViewLogger = (location) => {
    const analytics = useAnalytics();

    useEffect(() => {
      analytics.logEvent('page_view', { path_name: location.pathname});
    });
  
    return null;
}

export default withRouter(PageViewLogger);