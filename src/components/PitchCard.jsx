import React, { useState, useEffect } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";

const PitchCard = () => {
  const [pitch, setPitch] = useState("");
  const [loading, setLoading] = useState(true);

  const investor = {
    firstName: "asdfa",
    lastName: "asfads",
    industryInterests: "Retail",
    investmentScale: "micro",
  };

  const productDesc =
    "AI-powered agricultural insights using satellite imagery";
  const orgInfo =
    "AgroTechX, a startup focused on using deep learning for precision farming";

  useEffect(() => {
    let isMounted = true;

    const fetchPitch = async () => {
      const apiKey = "AIzaSyB9ysi6yAMtoFdqRXfc2IJ-gGRoRsrOp2c";
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      const formattedInvestor = `
        Name: ${investor.firstName} ${investor.lastName}
        Interests: ${investor.industryInterests}
        Investment scale: ${investor.investmentScale}
      `;

      const prompt = `
        You are an expert startup pitch advisor. Use the following context to write 3 bullet points on why this investor should fund the campaign.
        
        - Product Description: ${productDesc}
        - Organization Info: ${orgInfo}
        - Investor Info: ${formattedInvestor}
        
        Each bullet point should be:
        1. Between 15–25 words
        2. Customized for the investor's interest
        3. Focus on market opportunity, solution uniqueness, traction or ROI potential
        
        Format:
        - [Market/Opportunity] ...
        - [Solution/Innovation] ...
        - [Traction/Returns] ...
        Only return the 3 bullet points. No extra text.
      `;

      try {
        console.log("Generating pitch...");
        const result = await model.generateContent(prompt);
        const responseText = await result.response.text();
        if (isMounted) {
          setPitch(responseText);
          console.log("Pitch:", responseText);
        }
      } catch (error) {
        console.error("Error generating pitch:", error);
        if (isMounted) {
          setPitch("Failed to generate pitch.");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchPitch();

    return () => {
      isMounted = false;
    };
  }, []); // Empty dependency array to run only once

  const renderPitchPoints = () => {
    if (!pitch) return null;

    return pitch
      .split("- ")
      .filter((point) => point.trim())
      .map((point, index) => <p key={index}>- {point.trim()}</p>);
  };

  return (
    <div className="card">
      {loading ? <p>Loading pitch...</p> : <div>{renderPitchPoints()}</div>}
    </div>
  );
};

export default PitchCard;