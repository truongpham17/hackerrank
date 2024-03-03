  double myIndicatorValue = iCustom(Symbol(), Period(), "1000PCS_Indi", parameters, 0, 0);
   if (myIndicatorValue != previousMyIndicatorValue)
   {
        // Execute your function based on the change in the indicator value
        Print("Indicator Value: ", indicatorValue);

        // Update the previous value for the next iteration
        previousMyIndicatorValue = myIndicatorValue;
   }