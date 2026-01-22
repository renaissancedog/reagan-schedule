// Script to peruse catalog .txt file
// By William Liu, 2025
package scripts.catalog;

import java.io.*;
import java.util.*;
public class Catalog {
  public static void main(String[] args) throws IOException{
    String infile="scripts/catalog/rawcatalog.txt";
    String midfile="scripts/catalog/midcatalog.txt";
    String outfile="client/static/processedcatalog.txt";
    //preprocessing
    
    PrintWriter mw=new PrintWriter(new FileWriter(midfile));
    try (BufferedReader r = new BufferedReader(new FileReader(infile))) {
      String line = r.readLine();
      while (line!=null) {
        if (!line.startsWith("Items in the Course Catalog are subject to changes")) {
          if (!line.startsWith("Course:")&&line.contains("Course:")) {
            line=line.substring(line.indexOf("Course:"));
          }
          if (line.startsWith("Course Description:")) {
            if (line.length()>20) {
              line=line.substring(20);
            } else {
              line="";
            }
          }
          mw.println(line);
        }
        line=r.readLine();
      } 
    } catch (IOException e) {
      System.err.println("Error: " + e.getMessage());
    }
    mw.close();
    
    //RUN THIS THING
    
    boolean found=false;
    ArrayList<Course> courses = new ArrayList<Course>();
    HashSet<String> uniqueNum=new HashSet<>();
    try (BufferedReader r = new BufferedReader(new FileReader(midfile))) {
      String line = r.readLine();
      while (line!=null) {
        if (line.startsWith("Course:")) {
          //This is all one course
          String name=line.substring(8);
          String desc="";
          String num;
          double credits;
          String term;
          String grade="";
          String preq = "";
          String notes = "";
          line=r.readLine(); //should be the first line of the description
          while (!line.startsWith("Course Number:")) {
            desc+=line;
            desc+=" ";
            line=r.readLine(); 
          }
          StringTokenizer st=new StringTokenizer(line);
          st.nextToken(); //Course
          st.nextToken(); //Number:
          num=st.nextToken();
          st.nextToken(); //Credits:
          credits=Double.parseDouble(st.nextToken()); //ex: 0.5
          st.nextToken(); //Term:
          if (st.nextToken().startsWith("Full")) {
            term="Year";
            st.nextToken(); //the 'year' in 'full year'
          } else {
            term="Semester";
          }
          st.nextToken(); //Grade
          st.nextToken(); //Placement:
          while (st.hasMoreTokens()) {
            grade+=(st.nextToken());
          }
          line = r.readLine();//Prerequisites
          preq=line;
          if (preq.length()>14) {
            preq=preq.substring(15);
          }
          line = r.readLine();
          while (!line.startsWith("Course:")) {
            if (line.startsWith("Special Notes:")) {
              if (line.length()>15) {
                line=line.substring(15);
              } else {
                line="";
              }
            }
            notes+=line;
            notes+=" ";
            line = r.readLine();
            if (line==null) {
              break;
            }
          }
          found=true;
          if (!uniqueNum.contains(num)) {
            Course c = new Course(name+" "+num, desc, credits, term, grade, preq, notes);
            courses.add(c);
          }
          uniqueNum.add(num);
        }
        if (!found) {
          line = r.readLine();
        } else {
          found=false;
        }
      }
    } catch (IOException e) {
      System.err.println("Error reading the file: " + e.getMessage());
    }
    PrintWriter pw=new PrintWriter(new FileWriter(outfile));
    for (Course c:courses) {
      pw.print(c.name+"\n"+c.desc+"\n"+c.cred+"\n"+c.term+"\n"+c.grade+"\n"+c.preq+"\n"+c.notes+"\n");
    }
    pw.close();
  }
}