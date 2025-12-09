import { ReactNode, useState, useEffect } from "react";
import LoadingPage from "../../pages/Loading";
import { GeneralContext, Preferences } from "../GeneralContext";
import { resolveStaticData } from "../../utils/staticData";

interface GeneralProviderProps {
  children: ReactNode;
}

export const GeneralProvider: React.FC<GeneralProviderProps> = ({
  children,
}) => {
  const [preferences, setPreferences] = useState<Preferences | null>(
    () => resolveStaticData("preferences") as Preferences | null
  );
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!preferences) {
      setPreferences(resolveStaticData("preferences") as Preferences | null);
    }
  }, [preferences]);

  const Child = () => {
    if (loading) {
      return <LoadingPage />;
    } else {
      return children;
    }
  };

  return (
    <GeneralContext.Provider
      value={{ preferences, setPreferences, loading, setLoading }}
    >
      <Child />
    </GeneralContext.Provider>
  );
};
