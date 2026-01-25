import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import ErrorBoundary from "./components/ErrorBoundary";
import NotFound from "./pages/NotFound";
import TutorialGeneration from "./pages/tutorial-generation";
import EffectLibrary from "./pages/effect-library";
import AfterEffectsControl from "./pages/after-effects-control";
import VideoUpload from "./pages/video-upload";
import AnalysisResults from "./pages/analysis-results";
import UserSettings from "./pages/user-settings";

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        <Route path="/" element={<VideoUpload />} />
        <Route path="/tutorial-generation" element={<TutorialGeneration />} />
        <Route path="/effect-library" element={<EffectLibrary />} />
        <Route path="/after-effects-control" element={<AfterEffectsControl />} />
        <Route path="/video-upload" element={<VideoUpload />} />
        <Route path="/analysis-results" element={<AnalysisResults />} />
        <Route path="/settings" element={<UserSettings />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
