package scripts.catalog;

public class Course {
  String name;
  String desc;
  double cred;
  String term;
  String grade;
  String preq;
  String notes;
  public Course(String name, String desc, double cred, String term, String grade, String preq, String notes) {
    this.name = name;
    this.desc = desc;
    this.cred = cred;
    this.term = term;
    this.grade = grade;
    this.preq = preq;
    this.notes = notes;
  }
  public String toString() {
    return name + " " + desc + " " +  cred + " " + term + " " + grade + " " + preq + " " + notes;
  }
}