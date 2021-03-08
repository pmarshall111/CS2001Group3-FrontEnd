// Medication Cycle Calculator  that count downs when the medication will need to be re-stocked
	// counter controlled repetition
import java.util.Scanner; 

public class MedicationCycleCalculator { 
	public static void main(String[] args) {
	
	    // scanner to obtain input from command window
	    Scanner input = new Scanner( System.in );

	    
		int initialCount; // initial medication count
	    int staffID; 
	    int dosage; // amount taken a day e.g. 3 a day
	    int daysRemaining;
	    
	        System.out.print( "Enter the intial medication count:" ); // prompt
	        initialCount = input.nextInt(); // input initial medication count
	        System.out.print( "Enter dosage count:"); // prompt
	        dosage = input.nextInt(); // input dosage taken a day 
	    	daysRemaining = initialCount / dosage;
	        if  (daysRemaining >= 15) { // Order Reminder Alert!
	        	 System.out.println( + daysRemaining + " DAYS REMAINING" );// Order New Cycle!
	    	    
	       	    }  else {
    	
	    System.out.println ( "ORDER NEW CYCLE!");
	    } 
	}


	
}

