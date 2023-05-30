export interface MemberModel {
  name: string;
  memberId: string;
  experience: string;
  allocationPercentage: string;
  description: string;
  startDate: string;
  endDate: string;
  skills: string[];
}

export class Member {
  private _name: string;
  public get name(): string {
    return this._name;
  }
  public set name(v: string) {
    this._name = v;
  }

  private _memberId: string;
  public get memberId(): string {
    return this._memberId;
  }
  public set memberId(v: string) {
    this._memberId = v;
  }

  private _description: string;
  public get description(): string {
    return this._description;
  }
  public set description(v: string) {
    this._description = v;
  }
  private _skills: string[];
  public get skills(): string[] {
    return this._skills;
  }
  public set skills(v: string[]) {
    this._skills = v;
  }

  private _allocationPercentage: string;
  public get allocationPercentage(): string {
    return this._allocationPercentage;
  }
  public set allocationPercentage(v: string) {
    this._allocationPercentage = v;
  }

  private _experience: string;
  public get experience(): string {
    return this._experience;
  }
  public set experience(v: string) {
    this._experience = v;
  }

  private _startDate: string;
  public get startDate(): string {
    return this._startDate;
  }
  public set startDate(v: string) {
    this._startDate = v;
  }

  private _endDate: string;
  public get endDate(): string {
    return this._endDate;
  }
  public set endDate(v: string) {
    this._endDate = v;
  }

  constructor(
    name: string,
    memberId: string,
    desc: string,
    skills: string[],
    allocation: string,
    experience: string,
    startDate: string,
    endDate: string
  ) {
    this._name = name;
    this._memberId = memberId;
    this._description = desc;
    this._skills = skills;
    this._allocationPercentage = allocation;
    this._experience = experience;
    this._startDate = startDate;
    this._endDate = endDate;
  }
}
