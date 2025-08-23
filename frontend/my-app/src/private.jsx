import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const NeedLogin = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/login', { replace: true });
    }, 2000); // 3 ثانیه صبر می‌کند

    return () => clearTimeout(timer);
  }, [navigate]);

  return <h1>برای استفاده از این صفحه باید ابتدا وارد شوید. در حال انتقال به صفحه لاگین...</h1>;
};

export const PrivateRoute = ({ user, children }) => {
  if (!user) {
    return <NeedLogin />;
  }
  return children;
};
