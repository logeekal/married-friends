import { addDurations, convertDurationToISO8601, convertTimeToHighestUnit } from ".";
import { IDuration } from "../types/common";


describe ("Testing durations additions", ()=> {
  it("Add only minutes and sum less than 60 minutes", () => {
    let t1 : IDuration = {
      hours: 0,
      minutes: 5
    }

    let t2 : IDuration = {
      hours: 0,
      minutes: 50
    }

    let result = addDurations([t1, t2])

    expect(result).toMatchObject({
      hours: 0,
      minutes: 55
    })
  })
  it("Add only minutes and sum equal to 60 minutes", () => {
    let t1 : IDuration = {
      hours: 0,
      minutes: 5
    }

    let t2 : IDuration = {
      hours: 0,
      minutes: 55
    }

    let result = addDurations([t1, t2])

    expect(result).toMatchObject({
      hours: 1,
      minutes: 0
    })
  })

  it("Add only minutes and sum more than 60 minutes", () => {
    let t1 : IDuration = {
      hours: 0,
      minutes: 5
    }

    let t2 : IDuration = {
      hours: 0,
      minutes: 76
    }

    let result = addDurations([t1, t2])

    expect(result).toMatchObject({
      hours: 1,
      minutes: 21
    })
  })
})


describe("Testing time to ISO-8601", () => {
  it("Passing time only in minutes", () => {
    const duration: IDuration = {
      hours: 0,
      minutes: 20,
    };

    const result = convertDurationToISO8601(duration);

    expect(result).toBe("PT20M");
  });

  it("Passing time more than 60 minutes", () => {
    const duration: IDuration = {
      hours: 0,
      minutes: 70,
    };

    const result = convertDurationToISO8601(convertTimeToHighestUnit(duration));

    expect(result).toBe("PT1H10M");
  });

  it("Passing time only in hours", () => {
    const duration: IDuration = {
      hours: 2,
      minutes: 0,
    };

    const result = convertDurationToISO8601(duration);

    expect(result).toBe("PT2H");
  });
  it("Passing time both in hours and in minutes", () => {
    const duration: IDuration = {
      hours: 2,
      minutes: 10,
    };

    const result = convertDurationToISO8601(convertTimeToHighestUnit(duration));

    expect(result).toBe("PT2H10M");
  });
  it("Passing time both in hours and more than minutes", () => {
    const duration: IDuration = {
      hours: 2,
      minutes: 130,
    };

    const result = convertDurationToISO8601(convertTimeToHighestUnit(duration));

    expect(result).toBe("PT4H10M");
  });
});
