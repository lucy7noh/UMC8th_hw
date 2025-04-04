// 클래스 선언
class Student {
    constructor(name, school) {
        this._name = name; 
        this._school = school;
    }

    // Getter: 이름 가져오기
    get name() {
        return this._name;
    }

    // Setter: 이름 변경 (이름 조건: 두글자 이상) 
    set name(newName) {
        if (newName.length < 2) {
            console.log("이름은 두글자 이상이어야 합니다!");
            return;
        }
        this._name = newName;
    }

    // Getter: 학교명 가져오기
    get school() {
        return this._school;
    }

    // Setter: 학교명 변경 (학교명은 '대학교'를 포함해야 함)
    set school(newSchool) {
        if (!newSchool.includes("대학교")) {
            console.log("학교명은 '대학교'를 포함해야 합니다!");
            return;
        }
        this._school = newSchool;
    }

    introduction() {
        console.log(`안녕하세요, 저는 ${this.name}입니다. ${this.school}에 다니고 있습니다.`);
    }
}

// 객체 생성
const student = new Student("영희희", "서울대학교");

// 잘못된 값 입력 
student.name = "J"; // "이름은 두글자 이상이어야 합니다!"

// 정상적인 값 변경
student.name = "루시";
console.log(student.name); // "루시"


//잘못된 값 입력 
student.school = "umc"; // "학교명은 '대학교'를 포함해야 합니다!"

// 정상적인 값 입력
student.school = "동덕여자대학교";
console.log(student.school); // "동덕여자대학교"

//올바른 데이터만 출력됨
student.introduction(); 
// 출력: "안녕하세요, 저는 루시입니다. 동덕여자대학교에 다니고 있습니다."
