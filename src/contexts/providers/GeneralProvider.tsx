import { ReactNode, useState, useMemo, useEffect } from "react";
import LoadingPage from "../../pages/Loading";
import { GeneralContext, Preferences } from "../GeneralContext";

interface GeneralProviderProps {
  children: ReactNode;
}

export const GeneralProvider: React.FC<GeneralProviderProps> = ({
  children,
}) => {
  const [preferences, setPreferences] = useState<Preferences | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchPreferences = useMemo(() => {
    const fetchPreferencesFromServer = async () => {
      const endpoint = "/preferences";
      const apiUrl = import.meta.env.VITE_SERVER_API_URL + endpoint;

      try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error(`Error fetching preferences: ${response.statusText}`);
        }
        const data = await response.json();
        setPreferences(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    return fetchPreferencesFromServer;
  }, []);

  useEffect(() => {
    fetchPreferences();
  }, [fetchPreferences]);

  return (
    <GeneralContext.Provider
      value={{ preferences, setPreferences, loading, setLoading }}
    >
      {preferences ? children : <LoadingPage />}
    </GeneralContext.Provider>
  );
};
